import userService from "../../../lib/user-service";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(`POST: ${JSON.stringify(req.body)}`);

    const response = await userService.register(req.body);
    if (response) {
      return res.status(201).json(response);
    }
  }

  res.status(422).end();
}