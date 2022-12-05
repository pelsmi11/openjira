import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `El id no es válido ${id}` });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);

    case "DELETE": ///// esto modificado
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: `MÉTODO NO EXISTE` });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: `No hay entrada con ese ID: ${id}` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updateEntry!);
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: error.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: `No hay entrada con ese ID: ${id}` });
  }

  return res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // console.log('entre en el api/entries/id/index.ts')
  const { id } = req.query;

  await db.connect();
  const entryDBTodelete = await Entry.findByIdAndDelete(id);
  await db.disconnect();

  // console.log('estoy antes del if en  api/entries/id/index.ts')

  if (!entryDBTodelete) {
    return res.status(400).json({ message: "No hay entrada con ese id " + id });
  }

  return res.status(200).json(entryDBTodelete);
};
