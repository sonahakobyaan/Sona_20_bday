"use client";

import { Card } from "antd";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { CheckCircleOutlined, UserAddOutlined } from '@ant-design/icons';


const { Meta } = Card;

interface CardComponentProps {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  onClick?: () => void;
  layoutId?: string;
  disabled?: boolean;
  status?: "COMING" | "INVITED";
}

export default function CardComponent({
  imageSrc,
  title,
  description,
  onClick,
  layoutId,
  disabled = false,
  status,
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
        {status && (
        <p className={`mt-2 text-sm font-bold ${status === "COMING" ? "text-[var(--primary-purple)]" : "text-gray-500"}`}>
        {status === "COMING" ? <CheckCircleOutlined className="mr-1" /> : <UserAddOutlined className="mr-1" />}
        {status}
      </p>
      )}
      </Card>
    </motion.div>
  );
}
