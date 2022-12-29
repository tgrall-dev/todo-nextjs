import { signIn, useSession, signOut } from "next-auth/react";
import { Container, Button } from "@mui/material";
import { useRouter } from 'next/router';

export default function AuthButton() {
  const { data: session } = useSession();

  const router = useRouter();

  if (session) {
    return (
      <Container>
        Signed in as {session.user?.email} <br />
        <Button variant="contained" onClick={() => signOut()}>Sign out</Button>
      </Container>
    )
  } else {
    return (
      <Container>
        <Button variant="contained" onClick={() => signIn()}>Sign in</Button>
        <Button onClick={() => { router.push('/auth/signup') }}>Sign up</Button>

      </Container>
    )
  }
}