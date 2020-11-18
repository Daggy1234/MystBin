import { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import styles from '../styles/EditorTabs.module.css'


export default function EditorTabs() {
  const [value, setValue] = useState(["..."]);
  const [currTab, setCurrTab] = useState(0);
  const [tabCount, setTabCount] = useState(0);
  const [lang, setLang] = useState(Array(5).fill('none'))

  function onMount(_, editor) {
      setTabCount( tabCount + 1)
  }

  return (
    <>
        <div>
      <div className={styles.tabsContainer}>

          {value.map((v, i) => (
              <div
                  onClick={() => setCurrTab(i)}
                  className={currTab === i ? styles.tabsSelected : styles.tabs}
                  onKeyDown={(e) => {
                      const button = e.currentTarget

                      if(e.code == 'Enter') {
                          button.blur()  // Lose focus...
                      }
                  }}
                  onBlur={(e) => {
                      const button = e.currentTarget

                      if(button.textContent === '') {
                          button.children[0].textContent = `file_${i}`
                      }

                      if(button.textContent.endsWith(".py")) {
                          let langCopy = [...lang]
                          langCopy[currTab] = 'python'

                          setLang(langCopy)
                      }
                  }}

              >
                  <text
                      contentEditable={true}
                      className={styles.tabsFilename}
                      onKeyDown={(e) => {
                          if(e.code === 'Enter') {
                              e.preventDefault()
                              e.currentTarget.blur()
                          }
                      }}
                  >file_{i}
                  </text>
              </div>
          ))}

      <button
          className={styles.tabsNew}
        onClick={() => {
          if (tabCount <= 4) {
          let newValue = [...value];
          newValue.push("");
          setValue(newValue);
          }
        }}
      >
        +
      </button>
      </div>

      {value.map((v, i) => (
        <div
          style={{
            display: currTab === i ? "block" : "none",
          }}
          className={'maxed'}
        >
          <MonacoEditor
            onMount={onMount}
            value={value[i]}
            language={lang[i]}
            onChange={(ev, newVal) => {
              let newValue = [...value];
              newValue[i] = newVal;
              setValue(newValue);
            }}
            theme={"mystBinDark"}
          />
        </div>
      ))}

      </div>
    </>
  );
}
