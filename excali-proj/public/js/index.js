/*eslint-disable */
import InitialData from "./initialData.js";
var saveClicks =1;
var stopClicks =0;
var doesExist =0;
var version;
var fname;
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
    React.createElement( //Click to see all Files
      "div",
      { className: "button-wrapper" },
      React.createElement(
        "a",{
          href : "/allImages"
        },
        "See All Images"
      ),
      React.createElement( // Click to start Saving..
        "button",{
          className: "SaveButton",
          onClick:async ()=>{
              if(saveClicks-stopClicks === 1){
              fname = undefined;    
              fname = window.prompt("Enter the name of the file: ")
              version =0;
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
                    },
                    error: function (jqXHR, exception) {
                      alert("File Name Already exists"); 
                      saveClicks--;
                      clearInterval(xyz);
                      console.log("Cleared time")
                      doesExist =1;

                    }
                });
          
                  var ele = excalidrawRef.current.getSceneElements();
                  if(doesExist==0){
                    xyz = setInterval(async () => {
                      if (ele !== excalidrawRef.current.getSceneElements()) {
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
                          },
                          error: function (jqXHR, exception) {
                              console.log(`Error ${jqXHR.status}`+ exception);
                          }
                      });
                        ele = excalidrawRef.current.getSceneElements();
                      }
                    }, 10000);
                  }
                  
              }
              else{
                alert("Enter File name")
              }
              }
              else{
                  alert("Already Saving");
              }
            }
          },
          
        
        'Start Saving..',

      ),
      React.createElement( // Click to stop saving
        "button",{
          className: "dontSaveButton",
          onClick: async ()=>{
            if(saveClicks-stopClicks === 2){
                saveClicks--;
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
                  },
                  error: function (jqXHR, exception) {
                      console.log(`Error ${jqXHR.status}`+ exception);
                  }
              });
               clearTimeout(xyz);
                 console.log('Cleared Time');
                window.alert('Saving is Stopped');
            }
            else{
                alert("already stopped");
            }

          },
          
        },
        'stop saving..',
      ),
      React.createElement(//Update scene
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
      React.createElement( //viewMode
        "label",
        null,
        React.createElement("input", {
          type: "checkbox",
          checked: viewModeEnabled,
          onChange: () => setViewModeEnabled(!viewModeEnabled)
        }),
        "View mode"
      ),
      React.createElement(//Zen mode
        "label",
        null,
        React.createElement("input", {
          type: "checkbox",
          checked: zenModeEnabled,
          onChange: () => setZenModeEnabled(!zenModeEnabled)
        }),
        "Zen mode"
      ),
      React.createElement(//gridmode
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
    React.createElement( //Canvas or the drawing area
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
 