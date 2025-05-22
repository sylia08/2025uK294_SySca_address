import React from "react";
import Button from "../atoms/Button";

interface DeleteInfoProps {
  importedDate: string;
  onDelete: () => void;
}

const DeleteInfo: React.FC<DeleteInfoProps> = ({ importedDate, onDelete }) => (
  <div className="Line">
    <p className="desc">Imported:</p>
    <p className="date">{importedDate}</p>
    <Button onClick={onDelete}>Delete</Button>
  </div>
);

export default DeleteInfo;
