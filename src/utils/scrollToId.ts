export const scrollToId = (id: string) => {
   const el = document.getElementById(id);
   if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
   }
   if (id.includes("https:")) {
      window.open(id, "_blank");
   }
   if (id === "/") {
      window.open(id, "_parent");
   }
};