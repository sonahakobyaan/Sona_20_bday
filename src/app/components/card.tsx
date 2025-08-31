"use client";

import Image from "next/image";
import { Card } from "antd";
const { Meta } = Card;

interface CardComponentProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function CardComponent({
  imageSrc,
  title,
  description,
}: CardComponentProps) {
  return (
    <Card
      hoverable
      style={{
        width: 220,
        background: "linear-gradient(to bottom, white, var(--primary-purple))",
        border: "2px solid var(--primary-purple)"
      }}
      cover={<Image alt={title} src={imageSrc} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
