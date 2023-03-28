function createImage (src) {
  const image = new Image(0, 0);
  image.src = src;
  return image;
}

export const emojis = {
 '-': ' ',
    'O': createImage('./icons/tierra.png'),
    'X': createImage('./icons/roca.png'),
    'W': createImage('./icons/roca2.png'),
    'I': createImage('./icons/astronauta.png'),
    'S': createImage('./icons/satellite.png'),
    'PLAYER': createImage('./icons/cohete.png'),
    'BOMB_COLLISION': '💥',
    'GAME_OVER': '👾',
    'WIN': '🏆',
    'HEART':'❤️',
  };
  
  const maps = [];
  maps.push(`
    IXXWXXXXXX
    -XXXXXXXXX
    -XXXXXXWXX
    -XXXXXXXXX
    -XXXWXXXXX
    -XXXXXXXXX
    -XWXXXXXXX
    -XXXXXWXXX
    -XXXXXXXXX
    OXXWXXXXXX
  `);
  maps.push(`
    O--XXWXXXX
    X--XXXXXXX
    XX----XXWX
    X--XX-XXXX
    X-XXX--XWX
    X-XWXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    WXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXW
    XX----XXXX
    XX-XXXXWXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XWX
    XX-XXXXXXX
    WX-----OXX
    XXXXXXXXXW
  `);
  maps.push(`
    OXXXWXXXXX
    ----XXXXWX
    -XX-XXXXXX
    -XX---x--I
    -XWX----XX
    -XXXX--XXX
    --------XX
    -XXXX-XXSX
    -XXXXXXXXX
    XXXWXXXXXX`
  );
  maps.push(`
  WXXXX--XX-
  ----XXW-XX
  -XX-XX-X-X
  ------X--O
  -XXX----X-
  X-WXX--XX-
  --X-----X-
  -XXXX-XXX-
  I--X--XWX-
  XX---X---X
  `);
  maps.push(`
  WXXIX--XX-
  X---XXW-XW
  --XWXX-X-X
  -XX---X--X
  --XX----X-
  X-XWX--XS-
  --X-----X-
  -XXXX-XWX-
  O--X--XWX-
  XX---X---W
  `);
  maps.push(`
  X-XOX--XX-
  XWX-XX--XW
  --X-XXWX-X
  XSX------X
  --WX--X-X-
  X-XX-XXXI-
  -----X----
  -X-XX--XW-
  X--X--XWX-
  XX---X---W
  `);

  export {
    maps,
  };
  