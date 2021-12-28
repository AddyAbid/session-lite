import React from 'react';
import AppDrawer from './drawer';
import MarketPlace from './market';
import Icons from './icons';
export default function Home(props) {
  return (
    <>
    <AppDrawer />
    <MarketPlace/>
    <Icons />
    </>
  );
}
