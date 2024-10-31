export const scrollToId = (id: string) => {
   const el = document.getElementById(id);
   if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
   }
   if (id.includes("https:")) {
      window.open(id, "_blank");
      return;
   }
   if (id.includes("/")) {
      window.open(id, "_parent");
   }
};