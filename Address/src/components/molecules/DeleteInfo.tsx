import React from "react";
import Button from "../atoms/Button";

interface DeleteInfoProps {
  importedDate: string;
  onDelete: () => void;
}

const DeleteInfo: React.FC<DeleteInfoProps> = ({ importedDate, onDelete }) => (
  <div className="line">
    <p className="desc">Imported: {importedDate}</p>
    <Button onClick={onDelete}>Delete</Button>
  </div>
);

export default DeleteInfo;
