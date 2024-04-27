export class DOM {
  static createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    element.textContent = textContent;
    return element;
  }

  static getParentAtribut(selector, attributeName) {
    const element = document.querySelector(selector);
    if (element) {
      const parent = element.parentElement
      return parent.getAttribute(attributeName);
    } else {
      console.error(`Element "${selector}" not found.`);
      return null;
    }
  }

  static getByTag(tagName) {
    return document.getElementsByTagName(tagName);
  }

  static getByClass(className) {
    return document.getElementsByClassName(className);
  }

  static getById(id) {
    return document.getElementById(id);
  }

  static append(parentSelector, child) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
      parentElement.appendChild(child);
    } else {
      console.error(`Parent element "${parentSelector}" not found.`);
    }
  }

  static setAttribute(selector, attributeName, attributeValue) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.setAttribute(attributeName, attributeValue);
    });
  }

  static getAttribute(selector, attributeName) {
    const element = document.querySelector(selector);
    if (element) {
      return element.getAttribute(attributeName);
    } else {
      console.error(`Element "${selector}" not found.`);
      return null;
    }
  }

  static addClass(selector, className) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.add(className);
    });
  }

  static removeClass(selector, className) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(className);
    });
  }

  static removeElement(selector) {
    const element = document.querySelector(selector);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  static setHTML(parentSelector, child) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
      parentElement.innerHTML=child;
    } else {
      console.error(`Parent element "${parentSelector}" not found.`);
    }
  }

  static getHTML(parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
      return parentElement.innerHTML;
    } else {
      console.error(`Parent element "${parentSelector}" not found.`);
    }
  }

  static append(parentSelector, child) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
      parentElement.appendChild(child);
    } else {
      console.error(`Parent element "${parentSelector}" not found.`);
    }
  }

  static addEventListener(selector, event, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener(event, handler);
    });
  }

  static removeEventListener(selector, event, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.removeEventListener(event, handler);
    });
  }


  static getValue(selector) {
    const element = document.querySelector(selector);
    if (element && ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
      return element.value;
    } else {
      console.error(`Element "${selector}" not found or not a form field.`);
      return null;
    }
  }

  static setValue(selector, value) {
    const element = document.querySelector(selector);
    if (element && ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
      element.value = value;
    } else {
      console.error(`Element "${selector}" not found or not a form field.`);
    }
  }
}


