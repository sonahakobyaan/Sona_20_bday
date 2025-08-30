"use client";

import Image from "next/image";
import { Card } from "antd";
const { Meta } = Card;

export default function CardComponent() {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <Image
        width={20}
        height={20}
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
}
