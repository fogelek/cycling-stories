const profileImage = document.querySelector(".profile-image");
const profileImg = document.querySelector(".profile-image img");
const url = `/media/${profileImage.getAttribute("data-url")}`;
document.querySelectorAll('.profiles input[name="profile"]').forEach((item) =>
  item.addEventListener("change", (x) => {
    profileImage.title = x.target.value;
    profileImg.src = `${url}/${x.target.id}.webp`;
    profileImg.alt = x.target.value;
  })
);
document.querySelector('.profiles input[name="profile"]').click();
