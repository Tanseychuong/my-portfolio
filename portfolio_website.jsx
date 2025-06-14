import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Portfolio() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-3xl font-bold">Chuong Nyang</h1>
        <div>
          <Button onClick={handleMenuClick}>Menu</Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>About</MenuItem>
            <MenuItem onClick={handleClose}>Projects</MenuItem>
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </Menu>
        </div>
      </header>

      <section className="text-center mt-16">
        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Building impactful solutions with code.
        </motion.h2>
        <p className="mt-4 text-gray-600">Developer | Innovator | Problem Solver</p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="hover:shadow-lg transition-shadow">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Project Title {item}</h3>
              <p className="text-gray-600">Brief description of the project, its purpose and technologies used.</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-4 text-xl mb-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="mailto:nyang16@outlook.com"><FaEnvelope /></a>
        </div>
        <p>&copy; 2025 Chuong Nyang. All rights reserved.</p>
      </footer>
    </main>
  );
}
