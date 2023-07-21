import { autoClickEnabled, toggleAutoClick } from "./autoClick";


const addErrorElement = (message: string) => {
    const errorElement:HTMLDivElement = document.createElement('div');
    errorElement.classList.add('p-2', 'bg-red-100', 'items-center', 'text-red-700', 'leading-none', 'lg:rounded-full', 'flex', 'lg:inline-flex');
    
    const errorIcon = document.createElement('img');
    errorIcon.classList.add('fill-current', 'opacity-75', 'h-8', 'w-8', 'mx-2');
    errorIcon.src = chrome.runtime.getURL('assets/img/favicon.png');
    
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('font-semibold', 'mr-2', 'text-left', 'flex-auto');
    errorMessage.innerText = message;
    
    errorElement.appendChild(errorIcon);
    errorElement.appendChild(errorMessage);
    errorElement.appendChild(getAutoClickButton());

    errorElement.style.position = 'fixed';
    errorElement.style.bottom = '0';
    errorElement.style.width = '100%';
    errorElement.style.zIndex = '1';

    document.body.appendChild(errorElement);
}

const addSuccessElement = (message: string) => {
    const errorElement:HTMLDivElement = document.createElement('div');
    errorElement.classList.add('p-2', 'bg-green-100', 'items-center', 'text-green-700', 'leading-none', 'lg:rounded-full', 'flex', 'lg:inline-flex');
    
    const errorIcon = document.createElement('img');
    errorIcon.classList.add('fill-current', 'opacity-75', 'h-8', 'w-8', 'mx-2');
    errorIcon.src = chrome.runtime.getURL('assets/img/favicon.png');
    
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('font-semibold', 'mr-2', 'text-left', 'flex-auto');
    errorMessage.innerText = message;
    
    errorElement.appendChild(errorIcon);
    errorElement.appendChild(errorMessage);
    errorElement.appendChild(getAutoClickButton())

    errorElement.style.position = 'fixed';
    errorElement.style.bottom = '0';
    errorElement.style.width = '100%';
    errorElement.style.zIndex = '1';

    document.body.appendChild(errorElement);
}

const getAutoClickButton = () => {
	let isEnabled = autoClickEnabled();
	const toggleButton = document.createElement("button");
	toggleButton.classList.add("mx-2", "font-semibold");
	toggleButton.innerHTML = getAutoClickLabel(isEnabled);
	toggleButton.setAttribute("title", "Warning: auto-click feature Violates TOS");
	toggleButton.addEventListener("click", () => {
		isEnabled = !isEnabled;
		toggleButton.innerHTML = getAutoClickLabel(isEnabled);
		toggleAutoClick(isEnabled);
	});
	return toggleButton;
};

const getAutoClickLabel = (enabled: boolean) => `${enabled ? "Disable" : "Enable"} auto-click (page refresh required)`;

export { addErrorElement, addSuccessElement };