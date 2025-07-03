\
import { createServerSupabaseClient } from \'@supabase/auth-helpers-nextjs\';\n\
import { NextApiRequest, NextApiResponse } from \'next\';\n\
\n\
export default async function handler(req: NextApiRequest, res: NextApiResponse) {\n\
  if (req.method === \'POST\') {\n\
    const { email, password, otp } = req.body;\n\
\n\
    if (!email || !password) {\n\
      return res.status(400).json({ error: \'Email and password are required.\' });\n\
    }\n\
\n\
    const supabase = createServerSupabaseClient({ req, res });\n\
\n\
    const { data, error } = await supabase.auth.signInWithPassword({\n\
      email,\n\
      password,\n\
    });\n\
\n\
    if (error) {\n\
      return res.status(401).json({ error: error.message });\n\
    }\n\
\n\
    return res.status(200).json({ user: data.user });\n\
  } else {\n\
    res.setHeader(\'Allow\', [\'POST\']);\n\
    res.status(405).end(`Method ${req.method} Not Allowed`);\n\
  }\n\
}\n