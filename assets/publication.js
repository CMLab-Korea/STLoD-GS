// Set this when the arXiv identifier is assigned.
const arxivId = "";

function activateResource(key, label, url) {
  const placeholder = document.querySelector('[data-resource="' + key + '"]');
  const link = document.createElement("a");
  link.className = "resource";
  link.href = url;
  link.textContent = label;
  placeholder.replaceWith(link);
}

if (arxivId) {
  activateResource("arxiv", "arXiv", "https://arxiv.org/abs/" + arxivId);
  const citation = document.getElementById("project-bibtex");
  citation.textContent = citation.textContent.replace("xxxx.xxxxx", arxivId);
}

if (location.hostname === "cmlab-korea.github.io" &&
    location.pathname.startsWith("/STLoD-GS/")) {
  const badge = new Image();
  badge.alt = "Project page views";
  badge.src = "https://hits.sh/cmlab-korea.github.io/STLoD-GS.svg?label=Pageviews&color=0d207f";
  document.getElementById("project-pageviews").append(badge);
}
