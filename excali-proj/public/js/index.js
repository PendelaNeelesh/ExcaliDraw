/*eslint-disable */
import InitialData from "./initialData.js";
var saveClicks =1;
var stopClicks =0;
var xyz;
const App = () => {
  const excalidrawRef = React.useRef(null);
  const excalidrawWrapperRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({
    width: undefined,
    height: undefined
  });


  const [viewModeEnabled, setViewModeEnabled] = React.useState(false);
  const [zenModeEnabled, setZenModeEnabled] = React.useState(false);
  const [gridModeEnabled, setGridModeEnabled] = React.useState(false);

  React.useEffect(() => {
    setDimensions({
      width: excalidrawWrapperRef.current.getBoundingClientRect().width,
      height: excalidrawWrapperRef.current.getBoundingClientRect().height
    });
    const onResize = () => {
      setDimensions({
        width: excalidrawWrapperRef.current.getBoundingClientRect().width,
        height: excalidrawWrapperRef.current.getBoundingClientRect().height
      });
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [excalidrawWrapperRef]);

  const updateScene = () => {
    const sceneData = {
      elements: [
      ],
      appState: {
        viewBackgroundColor: "#edf2ff"
      }
    };
    excalidrawRef.current.updateScene(sceneData);
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "button-wrapper" },
      React.createElement(
        "a",{
          href : "/allImages"
        },
        "See All Images"
      ),
      React.createElement(
        "button",{
          className: "SaveButton",
          onClick:async ()=>{
              if(saveClicks-stopClicks === 1){
                  
              var fname = window.prompt("Enter the name of the file: ")
              var version =0;
              if(fname){
                saveClicks++;
                const svg = await window.Excalidraw.exportToSvg({
                    elements: excalidrawRef.current.getSceneElements(),
                    appState: {
                      ...InitialData.appState,
                      width: 300,
                      height: 100
                    },
                    embedScene: true
                  });
                  console.log(typeof svg.outerHTML);
                  $.ajax({
                    url: '/saveImage',
                    type: "POST",
                    data: {
                        svgText: svg.outerHTML,
                        Filename: fname,
                        ver: version++
                        
                    },
                    dataType: "application/json",
                    success: function (data) {
                        console.log('data');
                    },
                    error: function (jqXHR, exception) {
                      alert("File Name Already exists, Stop Saving and StartSaving Again");

                    }
                });
          
                  var ele = excalidrawRef.current.getSceneElements();
    
                  xyz = setInterval(async () => {
                    console.log("Ready at");
                    let t = new Date();
                    console.log(
                      t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
                    );
                    if (ele !== excalidrawRef.current.getSceneElements()) {
                      console.log("not equal");
                      const svg = await window.Excalidraw.exportToSvg({
                        elements: excalidrawRef.current.getSceneElements(),
                        appState: {
                          ...InitialData.appState,
                          width: 300,
                          height: 100
                        },
                        embedScene: true
                      });
                      $.ajax({
                        url: '/saveImage',
                        type: "POST",
                        data: {
                            svgText: svg.outerHTML,
                            Filename: fname,
                            ver: version++
                            
                        },
                        dataType: "application/json",
                        success: function (data) {
                            console.log('data');
                        },
                        error: function (jqXHR, exception) {
                          console.log('abc');
                            console.log(`Error ${jqXHR.status}`+ exception);
                        }
                    });
                      ele = excalidrawRef.current.getSceneElements();
                    }
                  }, 10000);
              }
              }
              else{
                  alert("Already Saving");
              }
            }
          },
          
        
        'Start Saving..',

      ),
      React.createElement(
        "button",{
          className: "dontSaveButton",
          onClick: ()=>{
            if(saveClicks-stopClicks === 2){
                saveClicks--;
                setTimeout(async () =>{
                 await clearTimeout(xyz);
                 console.log('Cleared Time');

                },10000);
                window.alert('Saving is Stopped');
            }
            else{
                alert("already stopped");
            }

          },
          
        },
        'stop saving..',
      ),
      React.createElement(
        "button",
        {
          className: "update-scene",
          onClick: updateScene
        },
        "Update Scene"
      ),
      React.createElement(
        "button",
        {
          className: "reset-scene",
          onClick: () => excalidrawRef.current.resetScene()
        },
        "Reset Scene"
      ),
      React.createElement(
        "label",
        null,
        React.createElement("input", {
          type: "checkbox",
          checked: viewModeEnabled,
          onChange: () => setViewModeEnabled(!viewModeEnabled)
        }),
        "View mode"
      ),
      React.createElement(
        "label",
        null,
        React.createElement("input", {
          type: "checkbox",
          checked: zenModeEnabled,
          onChange: () => setZenModeEnabled(!zenModeEnabled)
        }),
        "Zen mode"
      ),
      React.createElement(
        "label",
        null,
        React.createElement("input", {
          type: "checkbox",
          checked: gridModeEnabled,
          onChange: () => setGridModeEnabled(!gridModeEnabled)
        }),
        "Grid mode"
      )
    ),
    React.createElement(
      "div",
      {
        className: "excalidraw-wrapper",
        ref: excalidrawWrapperRef
      },
      React.createElement(Excalidraw.default, {
        ref: excalidrawRef,
        width: dimensions.width,
        height: dimensions.height,
        initialData: InitialData,
        // onChange: (elements,state)=>{
        //   console.log('*****')
        //   var x = new Date();
        //   let t = x.getHours()+ ':'+x.getMinutes() + ':'+x.getSeconds();
        //   console.log(t)
        //   logi(elements,state)
          
        // },
        // onPointerUpdate: (payload) => console.log(payload),
        onCollabButtonClick: () => window.alert("You clicked on collab button"),
        viewModeEnabled: viewModeEnabled,
        zenModeEnabled: zenModeEnabled,
        gridModeEnabled: gridModeEnabled
      }),
      
    )
  );
};

const excalidrawWrapper = document.getElementById("app");

ReactDOM.render(React.createElement(App), excalidrawWrapper);
 