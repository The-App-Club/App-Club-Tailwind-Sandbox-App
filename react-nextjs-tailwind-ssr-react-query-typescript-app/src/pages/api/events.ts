// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import data from '@/data/events.json';
import {Event} from '@/domains/Event';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  res.status(200).json(data);
}
