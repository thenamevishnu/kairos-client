/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                gradientv1: "linear-gradient(90deg, rgba(255,255,255,0.272233893557423) 0%, rgba(0,255,239,0.07335434173669464) 100%);"
            },
            keyframes: {
                floating: {
                    "0%": { transform: 'translate(0%, 0%)'},
                    "25%": { transform: 'translate(0%, 2%)' },
                    "50%": { transform: 'translate(0%, 0%)' },
                    "75%": { transform: 'translate(0%, -2%)' },
                    "100%": { transform: 'translate(0%, 0%)' },
                }
            },
            animation: {
                floating: "floating 5s linear infinite"
            },
            colors: {
                mainGreen: "#093B3B",
                primaryGreen: "#E3FFF1",
                secondaryGreen: "#F3F5F7",
                lightGreen: "#136E61"
            }
        },
    },
    plugins: [],
}