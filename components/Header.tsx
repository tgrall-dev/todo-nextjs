import React from 'react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import AuthButton from './AuthButton';

import { Container, Link, Button, ButtonGroup } from "@mui/material";




const Header: React.FC = () => {
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  function link(path: string) {
    return () => {
      router.push(path);
    }
  }

  return (
    <ButtonGroup>
      <Button onClick={link('/')}>Feed</Button>
      <Button onClick={link('/drafts')} data-active={isActive('/drafts')}>My drafts</Button>
      <Button onClick={link('/create')}>Create post</Button>
      <AuthButton />
    </ButtonGroup>
  );
};

export default Header;