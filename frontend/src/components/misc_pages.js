import React from "react";

function PageNotFound() {
    return (
        <div>
            <h1>ERROR 404: Page not found!</h1>
        </div>
    )
};

function About() {
    return (
        <div>
            <p>
                We constructed this website not only to learn more about front and backend development, but specifically how to 
                implement such skills in a realistic environment, such as a Website.
            </p>
        </div>
    )

}

export { PageNotFound, About }