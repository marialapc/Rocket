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
    -WXXXXXXXX
    -XXXXXWXXX
    -XXXXXXXXX
    OXXWXXXXXX
  `);
  maps.push(`
    O--XXWXXXX
    X--XXXXXXX
    XX----XXWX
    X--WX-XXXX
    X-XXX--XWX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    WXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXWX-XXXW
    XX----XXXX
    XX-XXXWXWX
    XX-----XXX
    XWXXXX-XXX
    XX-----XWX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXWXXX
  `);
  maps.push(`
    OXXXWXXXXX
    ----XXXXXX
    -XX-XXXXXX
    -XX---W--I
    -XWX----XX
    -XXXX--XXX
    --------XX
    -XXXX-XXSX
    -XXXXXXXXX
    WXXWXXXXXX`
  );
  maps.push(`
  WXXXX--XX-
  ----XXX-XX
  -XX-XX-W-X
  ------W--O
  -XXX----X-
  X-WXX--XX-
  --X-----X-
  -XXXX-XXX-
  I--X--XWX-
  XX---X---X
  `);

  export {
    maps,
  };
  