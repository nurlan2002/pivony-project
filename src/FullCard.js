import React from 'react';
import "./FullCard.css";

function FullCard() {
    return (
        <div class="full-card">
            <figure class="full-card__shape">
                <img class="full-card__img" src="/assets/150.jfif" alt="Person on tour"/>
                <figcaption class="full-card__caption">Mary Smith</figcaption>
            </figure>
            <div class="full-card__text">
                <h3 class="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                </p>
            </div>
        </div>
    )
}

export default FullCard
