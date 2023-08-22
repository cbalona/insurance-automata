<script>
  import { onMount } from 'svelte';

  let toc = '';

  onMount(() => {
    let tocHtml = '<ul>';
    const headings = document.querySelectorAll('h2, h3');

    headings.forEach((heading, index) => {
      if (heading.tagName === 'H2') {
        tocHtml += `<li><a href="#section${index}">${heading.textContent}</a></li>`;
        heading.id = `section${index}`;
      }
      if (heading.tagName === 'H3') {
        tocHtml += `<ul><li><a href="#section${index}">${heading.textContent}</a></li></ul>`;
        heading.id = `section${index}`;
      }
    });

    tocHtml += '</ul>';
    toc = tocHtml;
  });
</script>

<div class="table-of-contents">{@html toc}</div>

<style>
  /* Add any styles for the table of contents here */
</style>
