import { useState } from "react";
import "../menu.css"

type MenuItem = {
  label: string;
  onClick: () => void;
};

type MenuProps = {
  label: string;
  items: MenuItem[];
};

function Menu({ label, items }: MenuProps) {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(!isVisible);
  }
  return (
    <div className="menu">
      <button onClick={handleClick}>{label}</button>
      {isVisible && (
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <button onClick={item.onClick}>{item.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;
