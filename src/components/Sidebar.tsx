import { useState } from 'react'

const COLORS = [
  '#1C1E23', '#FFFFFF', '#E2553B', '#F2A541',
  '#FFC857', '#4E9A5A', '#2E4FC7', '#8A4FBF',
]

function Sidebar() {
    const [selectedColor, setSelectedColor] = useState(COLORS[2])

    return (
        <aside className="sidebar">
            <section className="panel">
                <h2>Colors</h2>
                <div className="swatches">
                    {COLORS.map((color) => (
                        <button
                            key={color}
                            className={color === selectedColor ? 'swatch selected' : 'swatch'}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                            aria-label={'Choose color ${color}'} 
                        />
                    ))}
                </div>
                <p>Selected: {selectedColor}</p>
            </section>

            <section className='panel'>
                <h2>Filters</h2>
            </section>

            <section className='panel'>
                <h2>Layers</h2>
            </section>
        </aside>
    )
}

export default Sidebar