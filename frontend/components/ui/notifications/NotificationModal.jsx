"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", bounce: 0.2, duration: 0.5 },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { type: "spring", bounce: 0.2, duration: 0.3 },
    },
};

const svgVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeInOut" },
    },
};

const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeInOut" },
    },
};

const NotificationModal = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // окно исчезает через 3 секунды

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
            }}
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                    maxWidth: "90%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* SVG с обводкой (круг) и галочкой, анимированными эффектом "рисования" */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="96"
                    height="96"
                    viewBox="0 0 24 24"
                    style={{ marginBottom: "10px" }}
                >
                    {/* Обводка */}
                    <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        variants={circleVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ fill: "none", stroke: "green", strokeWidth: "1" }}
                    />
                    {/* Галочка */}
                    <motion.path
                        d="M20 6L9 17l-5-5"
                        variants={svgVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            fill: "none",
                            stroke: "green",
                            strokeWidth: 2,
                            strokeDasharray: "1", // помогает инициировать анимацию "рисования"
                        }}
                    />
                </motion.svg>
                {/* Текст уведомления */}
                <div style={{ fontSize: "16px" }}>{message}</div>
            </motion.div>
        </div>
    );
};

export default NotificationModal;