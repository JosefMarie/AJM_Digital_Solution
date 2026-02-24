'use client';

import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, placeholder, className = '' }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim().replace(/^,|,$/g, '');
        if (trimmedValue && !tags.includes(trimmedValue)) {
            setTags([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className={`flex flex-wrap gap-2 p-2 bg-void-800/50 border border-white/10 rounded-lg focus-within:border-neon-cyan focus-within:ring-2 focus-within:ring-neon-cyan/20 transition-all ${className}`}>
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-electric-indigo/30 border border-electric-purple/40 rounded-full text-neon-cyan text-sm group"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="text-white/40 hover:text-white transition-colors ml-1"
                        aria-label={`Remove ${tag}`}
                    >
                        ×
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                placeholder={tags.length === 0 ? placeholder : ''}
                className="flex-1 bg-transparent border-none outline-none text-white min-w-[120px] py-1 px-2"
            />
        </div>
    );
};

export default TagInput;
