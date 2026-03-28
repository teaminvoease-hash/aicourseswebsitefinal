document.querySelectorAll('[data-mark-complete]').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const fd = new FormData();
    fd.append('csrf_token', btn.dataset.csrf);
    fd.append('lesson_id', btn.dataset.lesson);
    fd.append('course_id', btn.dataset.course);
    const r = await fetch('/api/mark-lesson-complete.php',{method:'POST', body:fd});
    const j = await r.json();
    if(j.ok){ alert('Progress: '+j.progress+'%'); }
  });
});
