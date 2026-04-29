// REMOVE BUTTON
export function initRemoveItems() {
    const productList = document.querySelector(".product-list");

    if (productList) {
        productList.addEventListener("click", function(event) {
            // Check if the clicked element has the 'remove-btn' class
            if (event.target.classList.contains("remove-btn")) {
                // Find the closest parent 'article' (the cart card)
                const cartCard = event.target.closest(".cart-card");
                
                if (cartCard) {
                    // Remove the element from the HTML
                    cartCard.remove();
                    
                    // Optional: Call a function here to update the Total Price
                    console.log("Item removed from UI");
                }
            }
        });
    }
}


// MODAL BOX
export function initModal(){
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myCheckout-Btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
}

