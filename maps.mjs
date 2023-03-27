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
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXWXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXWXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXSX
    X--WX-XXXX
    X-XXX--XWX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    OXXXXXXXXX
    ----XXXXXX
    -XX-XXXXXX
    -XX---X--I
    -XXX----XX
    -XXXX--XXX
    --------XX
    -XXXX-XXXX
    -XXXXXXXXX
    XXXXXXXXXX`
  );
  maps.push(`
  XXXXX--XX-
  ----XXX-XX
  -XX-XX-X-X
  ------X--O
  -XXX----X-
  X-XXX--XX-
  --X-----X-
  -XXXX-XXX-
  I--X--XXX-
  XX---X---X
  `);

  export {
    maps,
  };
  