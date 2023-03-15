import "./DarkMode.scss";

const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};
const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};
const storedTheme = localStorage.getItem("theme");
const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
    setDark();
}

const toggleTheme = (e) => {
    e.target.checked ? setDark() : setLight()
};

const DarkMode = () => {
    return (
        <div className="toggle-theme-wrapper">
            <label className="toggle-theme" htmlFor="checkbox">
                <input
                    type="checkbox"
                    id="checkbox"
                    onChange={toggleTheme}
                    defaultChecked={defaultDark}
                />
                <div className="sliderDark round"></div>
            </label>
        </div>
    );
};

export default DarkMode;