const layout = ({ children }) => {
    return (
        <div className="p-4 bg-slate-300 border-2 border-black">
            <h2>Cars Layout</h2>
            <p>More common cars functionality here.</p>
            {children}
        </div>
    )
}
export default layout
