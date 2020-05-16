const label = window.document.getElementById('label');

/// #if _DEBUG_
label.innerText = '_DEBUG_';
/// #elif _RELEASE_
label.innerText = '_RELEASE_';
/// #else
label.innerText = 'Unknown';
/// #endif
