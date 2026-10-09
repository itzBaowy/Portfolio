import sharp from "sharp";
await sharp("public/og.svg").png().toFile("public/og.png");
