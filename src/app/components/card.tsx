"use client";

import Image from "next/image";
import { Card } from "antd";
import { motion } from "framer-motion";

const { Meta } = Card;

interface CardComponentProps {
  imageSrc: any;
  title: string;
  description: string;
  onClick?: () => void;
  layoutId?: string;   // ✅ add this
  disabled?: boolean;  // ✅ add this
}

export default function CardComponent({
  imageSrc,
  title,
  description,
  onClick,
  layoutId,
  disabled = false,
}: CardComponentProps) {
  return (
    <motion.div
      layoutId={layoutId}
      className={`cursor-pointer ${disabled ? "opacity-40 pointer-events-none" : ""}`}
      onClick={onClick}
    >
      <Card
        hoverable={!disabled}
        style={{
          width: 220,
          background: "transparent",
          justifySelf: "center",
          alignSelf: "center",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "transparent",
        }}
        cover={
          <motion.div layoutId={layoutId + "-image"}>
            <Image alt={title} src={imageSrc} />
          </motion.div>
        }
      >
        <Meta title={title} description={description} />
      </Card>
    </motion.div>
  );
}
