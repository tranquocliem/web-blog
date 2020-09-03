import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import BlogService from "../Services/BlogService";

const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

// Quill.register('modules/clipboard', PlainClipboard, true);

const QuillClipboard = Quill.import("modules/clipboard");

class Clipboard extends QuillClipboard {
  getMetaTagElements = (stringContent) => {
    const el = document.createElement("div");
    el.innerHTML = stringContent;
    return el.getElementsByTagName("meta");
  };

  async onPaste(e) {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = await clipboardData.getData("Text");

    const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
    if (urlMatches.length > 0) {
      e.preventDefault();
      urlMatches.forEach((link) => {
        axios
          .get(link)
          .then((payload) => {
            // let title, image, url, description;
            let title, image, url;
            for (let node of this.getMetaTagElements(payload)) {
              if (node.getAttribute("property") === "og:title") {
                title = node.getAttribute("content");
              }
              if (node.getAttribute("property") === "og:image") {
                image = node.getAttribute("content");
              }
              if (node.getAttribute("property") === "og:url") {
                url = node.getAttribute("content");
              }
              // if (node.getAttribute("property") === "og:description") {
              //     description = node.getAttribute("content");
              // }
            }

            const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

            let range = this.quill.getSelection();
            let position = range ? range.index : 0;
            this.quill.pasteHTML(position, rendered, "silent");
            this.quill.setSelection(position + rendered.length);
          })
          .catch((error) => console.error(error));
      });
    } else {
      //console.log('when to use this') 보통 다른 곳에서  paste 한다음에  copy하면 이쪽 걸로 한다.
      super.onPaste(e);
    }
  }
}
Quill.register("modules/clipboard", Clipboard, true);

const BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    const imgTag = super.create();
    imgTag.setAttribute("src", value.src);
    // imgTag.setAttribute("src", value.url);
    imgTag.setAttribute("alt", value.alt);
    // imgTag.setAttribute("width", "100%");
    imgTag.setAttribute("width", "60%");
    return imgTag;
  }

  static value(node) {
    return { src: node.getAttribute("src"), alt: node.getAttribute("alt") };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {
  static create(value) {
    if (value && value.src) {
      const videoTag = super.create();
      videoTag.setAttribute("src", value.src);
      videoTag.setAttribute("title", value.title);
      // videoTag.setAttribute("width", "100%");
      videoTag.setAttribute("width", "60%");
      videoTag.setAttribute("controls", "");

      return videoTag;
    } else {
      const iframeTag = document.createElement("iframe");
      iframeTag.setAttribute("src", value);
      iframeTag.setAttribute("frameborder", "0");
      iframeTag.setAttribute("allowfullscreen", true);
      // iframeTag.setAttribute("width", "100%");
      iframeTag.setAttribute("width", "60%");
      return iframeTag;
    }
  }

  static value(node) {
    if (node.getAttribute("title")) {
      return { src: node.getAttribute("src"), alt: node.getAttribute("title") };
    } else {
      return node.getAttribute("src");
    }
    // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "video";
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {
  static create(value) {
    const prefixTag = document.createElement("span");
    prefixTag.innerText = "첨부파일 - ";

    const bTag = document.createElement("b");
    //위에 첨부파일 글자 옆에  파일 이름이 b 태그를 사용해서 나온다.
    bTag.innerText = value;

    const linkTag = document.createElement("a");
    linkTag.setAttribute("href", value);
    linkTag.setAttribute("target", "_blank");
    linkTag.setAttribute("className", "file-link-inner-post");
    linkTag.appendChild(bTag);
    //linkTag 이런식으로 나온다 <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

    const node = super.create();
    node.appendChild(prefixTag);
    node.appendChild(linkTag);

    return node;
  }

  static value(node) {
    const linkTag = node.querySelector("a");
    return linkTag.getAttribute("href");
  }
}

FileBlot.blotName = "file";
FileBlot.tagName = "p";
FileBlot.className = "file-inner-post";
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {
  static create(value) {
    const prefixTag = document.createElement("span");
    prefixTag.innerText = "투표 - ";

    const bTag = document.createElement("b");
    bTag.innerText = value.title;

    const node = super.create();
    node.setAttribute("id", value.id);
    node.appendChild(prefixTag);
    node.appendChild(bTag);

    return node;
  }

  static value(node) {
    const id = node.getAttribute("id");
    const bTag = node.querySelector("b");
    const title = bTag.innerText;
    return { id, title };
  }
}

PollBlot.blotName = "poll";
PollBlot.tagName = "p";
PollBlot.className = "poll-inner-post";
Quill.register(PollBlot);

class QuillEditor extends React.Component {
  bandId;
  placeholder;
  onEditorChange;
  Value;
  onFilesChange;
  onPollsChange;
  _isMounted;

  constructor(props) {
    super(props);

    this.state = {
      editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
      files: [],
    };

    this.reactQuillRef = null;

    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (html) => {
    //console.log("html", html);
    // https://youtu.be/BbR-QCoKngE
    // https://www.youtube.com/embed/ZwKhufmMxko
    // https://tv.naver.com/v/9176888
    // renderToStaticMarkup(ReactHtmlParser(html, options));

    // this.setState(
    //   {
    //     editorHtml: this.props.Temp,
    //   },
    //   () => {
    //     this.props.onEditorChange(this.state.editorHtml);
    //   }
    // );
    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
  };

  componentDidMount = () => {
    //truyen tu trang updateblog qua
    //console.log(this.props.id);
    // BlogService.getBlogById(this.props.id).then((data) => {
    //   const { content } = data;
    //   //console.log(content);
    //   this.setState({
    //     editorHtml: content,
    //   });
    // });

    const variable = {
      _id: this.props.id,
      writer: this.props.userId,
    };
    BlogService.getBlogsById(variable).then((data) => {
      if (data.blog !== null) {
        const { content } = data.blog;
        this.setState({
          editorHtml: content,
        });
      }
    });
    //console.log(this.props);
  };
  // I V F P들을  눌렀을떄 insertImage: this.imageHandler로 가서  거기서 inputOpenImageRef를 클릭 시킨다.
  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click();
  };

  fileHandler = () => {
    this.inputOpenFileRef.current.click();
  };

  //upload dưới local
  // insertImage = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if (
  //     e.currentTarget &&
  //     e.currentTarget.files &&
  //     e.currentTarget.files.length > 0
  //   ) {
  //     const file = e.currentTarget.files[0];

  //     let formData = new FormData();
  //     const config = {
  //       header: { "content-type": "multipart/form-data" },
  //     };
  //     formData.append("file", file);

  //     axios.post("/blog/uploadfiles", formData, config).then((response) => {
  //       if (response.data.success) {
  //         const quill = this.reactQuillRef.getEditor();
  //         quill.focus();
  //         console.log(response.data);
  //         let range = quill.getSelection();
  //         let position = range ? range.index : 0;

  //         //먼저 노드 서버에다가 이미지를 넣은 다음에   여기 아래에 src에다가 그걸 넣으면 그게
  //         //이미지 블롯으로 가서  크리에이트가 이미지를 형성 하며 그걸 발류에서     src 랑 alt 를 가져간후에  editorHTML에 다가 넣는다.
  //         quill.insertEmbed(position, "image", {
  //           //src: "http://localhost:5000/" + response.data.url,
  //           src: response.data.url,
  //           alt: response.data.fileName,
  //         });
  //         quill.setSelection(position + 1);

  //         if (this._isMounted) {
  //           this.setState(
  //             {
  //               files: [...this.state.files, file],
  //             },
  //             () => {
  //               this.props.onFilesChange(this.state.files);
  //             }
  //           );
  //         }
  //       } else {
  //         return alert("failed to upload file");
  //       }
  //     });
  //   }
  // };
  //upload dưới local

  //sử dụng upload ảnh lên cloudinary
  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      // const config = {
      //   header: { "content-type": "multipart/form-data" },
      // };
      formData.append("file", file);

      axios.post("/blog/image", formData).then((response) => {
        if (response.data.success) {
          const quill = this.reactQuillRef.getEditor();
          quill.focus();
          let range = quill.getSelection();
          let position = range ? range.index : 0;

          quill.insertEmbed(position, "image", {
            src: response.data.result.url,
            alt: response.data.result.original_filename,
          });
          quill.setSelection(position + 1);

          if (this._isMounted) {
            this.setState(
              {
                files: [...this.state.files, file],
              },
              () => {
                this.props.onFilesChange(this.state.files);
              }
            );
          }
        } else {
          return alert("failed to upload file");
        }
      });
    }
  };
  //sử dụng upload ảnh lên cloudinary

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      axios.post("/blog/uploadfiles", formData, config).then((response) => {
        if (response.data.success) {
          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          let range = quill.getSelection();
          let position = range ? range.index : 0;
          quill.insertEmbed(position, "video", {
            //src: "http://localhost:5000/" + response.data.url,
            src: response.data.url,
            title: response.data.fileName,
          });
          quill.setSelection(position + 1);

          if (this._isMounted) {
            this.setState(
              {
                files: [...this.state.files, file],
              },
              () => {
                this.props.onFilesChange(this.state.files);
              }
            );
          }
        } else {
          return alert("failed to upload file");
        }
      });
    }
  };

  insertFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];
      console.log(file);

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      axios.post("/up", formData, config).then((response) => {
        if (response.data.success) {
          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          let range = quill.getSelection();
          let position = range ? range.index : 0;
          quill.insertEmbed(
            position,
            "file",
            response.data.result.original_filename
          );
          quill.setSelection(position + 1);

          if (this._isMounted) {
            this.setState(
              {
                files: [...this.state.files, file],
              },
              () => {
                this.props.onFilesChange(this.state.files);
              }
            );
          }
        }
      });
    }
  };

  render() {
    return (
      <div className="editor">
        <div id="toolbar">
          <select
            className="ql-header"
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="" />
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <button type="button" className="ql-align" value="">
            <svg viewBox="0 0 18 18">
              <line className="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
              <line className="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
              <line className="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
            </svg>
          </button>
          <button type="button" className="ql-align" value="center">
            <svg viewBox="0 0 18 18">
              <line className="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
              <line className="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>
              <line className="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>
            </svg>
          </button>
          <button type="button" className="ql-align" value="right">
            <svg viewBox="0 0 18 18">
              <line className="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
              <line className="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>
              <line className="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>
            </svg>
          </button>
          <button type="button" className="ql-align" value="justify">
            <svg viewBox="0 0 18 18">
              <line className="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
              <line className="ql-stroke" x1="15" x2="3" y1="14" y2="14"></line>
              <line className="ql-stroke" x1="15" x2="3" y1="4" y2="4"></line>
            </svg>
          </button>
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-insertImage" title="My Image">
            I
          </button>
          <button className="ql-insertVideo" title="My Video">
            V
          </button>
          <button className="ql-insertFile" title="My File">
            F
          </button>
          <select className="ql-color">
            <option value="rgb(0, 0, 0)" />
            <option value="rgb(230, 0, 0)" />
            <option value="rgb(255, 153, 0)" />
            <option value="rgb(255, 255, 0)" />
            <option value="rgb(0, 138, 0)" />
            <option value="rgb(0, 102, 204)" />
            <option value="rgb(153, 51, 255)" />
            <option value="rgb(255, 255, 255)" />
            <option value="rgb(250, 204, 204)" />
            <option value="rgb(255, 235, 204)" />
            <option value="rgb(204, 224, 245)" />
            <option value="rgb(235, 214, 255)" />
            <option value="rgb(187, 187, 187)" />
            <option value="rgb(102, 185, 102)" />
          </select>
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
          <button className="ql-link" />
          <button className="ql-code-block" />
          <button className="ql-video" />
          <button className="ql-blockquote" />
          <button className="ql-clean" />
        </div>
        <div className="quill">
          <ReactQuill
            id="quill-content"
            ref={(el) => {
              this.reactQuillRef = el;
            }}
            theme={"snow"}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
            value={this.state.editorHtml}
            //value={this.props.Temp}
            placeholder={this.props.placeholder}
          />
          <input
            type="file"
            accept="image/*"
            ref={this.inputOpenImageRef}
            style={{ display: "none" }}
            onChange={this.insertImage}
          />
          <input
            type="file"
            accept="video/*"
            ref={this.inputOpenVideoRef}
            style={{ display: "none" }}
            onChange={this.insertVideo}
          />
          <input
            type="file"
            accept="*"
            ref={this.inputOpenFileRef}
            style={{ display: "none" }}
            onChange={this.insertFile}
          />
        </div>
      </div>
    );
  }

  modules = {
    //syntax: true,
    toolbar: {
      container: "#toolbar",
      //id ="toorbar"는  그 위에 B I U S I V F P 이거 있는 곳이다.
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
        insertPoll: this.pollHandler,
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "video",
    "file",
    "link",
    "code-block",
    "video",
    "blockquote",
    "clean",
    "color",
    "align",
    "script",
    "list",
  ];
}

export default QuillEditor;
