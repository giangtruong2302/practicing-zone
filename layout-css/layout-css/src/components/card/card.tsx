import React from "react";
import "./card.css";

interface CardProps {
  img: string;
  title: string;
  description: string;
  tag: string[];
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  img,
  title,
  description,
  tag,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-img-container">
        <img className="img-card" src={img} alt={title} />
      </div>
      <div className="info-content">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="tag-content">
          {tag.map((t, index) => (
            <span className="badge" key={index}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
