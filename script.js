const products = {
  mint: { src: "images/lfinity-mint.jpg", ko: "민트", en: "MINT" },
  orange: { src: "images/lfinity-orange.jpg", ko: "오렌지", en: "ORANGE" },
  purple: { src: "images/lfinity-purple.jpg", ko: "퍼플", en: "PURPLE" },
  pink: { src: "images/lfinity-pink.jpg", ko: "핑크", en: "PINK" },
  cyan: { src: "images/lfinity-cyan.jpg", ko: "사이언", en: "CYAN" },
};

const visual = document.querySelector(".product-visual");
const productImage = document.querySelector("#productImage");
const modal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");

document.querySelectorAll(".color-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = products[button.dataset.color];
    visual.classList.add("is-changing");

    const preload = new Image();
    preload.onload = () => {
      productImage.src = item.src;
      productImage.alt = `LFINITY ${item.ko} 유니폼 앞면과 뒷면`;
      modalImage.src = item.src;
      modalImage.alt = `LFINITY ${item.ko} 유니폼 앞면과 뒷면 크게 보기`;
      visual.classList.remove("is-changing");
    };
    preload.src = item.src;

    document.querySelectorAll(".color-button").forEach((itemButton) => {
      const active = itemButton === button;
      itemButton.classList.toggle("is-active", active);
      itemButton.setAttribute("aria-pressed", String(active));
    });
  });
});

document.querySelector(".zoom-button")?.addEventListener("click", () => modal.showModal());
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });

const orderButton = document.querySelector(".order-actions .order-button");
const floatingOrderButton = document.querySelector(".floating-order-button");
const orderConsultationUrl = "https://open.kakao.com/o/sUDsNxLi";

const updateFloatingOrderButton = () => {
  const show = orderButton.getBoundingClientRect().bottom < 0;
  floatingOrderButton.classList.toggle("is-visible", show);
  floatingOrderButton.setAttribute("aria-hidden", String(!show));
  floatingOrderButton.tabIndex = show ? 0 : -1;
};

orderButton.addEventListener("click", () => {
  window.location.href = orderConsultationUrl;
});
floatingOrderButton.addEventListener("click", () => orderButton.click());
window.addEventListener("scroll", updateFloatingOrderButton, { passive: true });
window.addEventListener("resize", updateFloatingOrderButton);
updateFloatingOrderButton();
