document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const stepBtns = document.querySelectorAll(".step-btn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("regForm");
  const previewArea = document.getElementById("previewArea");

  let currentStep = 0;

  function showStep(n) {
    steps.forEach((step, i) => step.hidden = i !== n);
    stepBtns.forEach((btn, i) => btn.classList.toggle("active", i === n));

    prevBtn.style.display = n === 0 ? "none" : "inline-block";
    nextBtn.style.display = n === steps.length - 1 ? "none" : "inline-block";
    submitBtn.hidden = n !== steps.length - 1;
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  stepBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      currentStep = i;
      showStep(currentStep);
    });
  });

  // Preview singkat isi form
  form.addEventListener("input", () => {
    const data = new FormData(form);
    let preview = "";
    for (let [key, val] of data.entries()) {
      if (val instanceof File && val.name) {
        preview += `<p><strong>${key}:</strong> ${val.name}</p>`;
      } else if (val) {
        preview += `<p><strong>${key}:</strong> ${val}</p>`;
      }
    }
    previewArea.innerHTML = preview || "Belum ada data yang diisi.";
  });

  showStep(currentStep);
});
