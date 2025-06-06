import React, { useState, useEffect, useRef } from 'react';
import './CostumSelectCategory.css';

function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt._id === value && opt._id !== "__add_new__");

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen((open) => !open)}
      >
        {selectedOption ? selectedOption.name : placeholder || "Select..."}
        <span className={`arrow ${isOpen ? "open" : ""}`} />
      </button>
      {isOpen && (
        <ul className="custom-select-options">
          <li
            key="none"
            onClick={() => handleSelect("")}
            className={!value ? "selected" : ""}
          >
            -- Select Category --
          </li>
          {options.map((opt) => (
            <li
              key={opt._id}
              onClick={() => handleSelect(opt._id)}
              className={value === opt._id ? "selected" : ""}
              title={opt.name}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
