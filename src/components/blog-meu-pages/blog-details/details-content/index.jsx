import { useEffect } from "react";

const index = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="auto-container">
      <h4>Course Description</h4>

      <p>
        Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
        Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.
        Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this
        is a text link libero tempus congue.
      </p>

      <p>
        Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin
        sagittis dolor sed mi elementum pretium. Donec et justo ante. Vivamus
        egestas sodales est, eu rhoncus urna semper eu. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Integer tristique elit lobortis purus bibendum, quis dictum metus
        mattis. Phasellus posuere felis sed eros porttitor mattis. Curabitur
        massa magna, tempor in blandit id, porta in ligula. Aliquam laoreet nisl
        massa, at interdum mauris sollicitudin et.
      </p>
    </div>
  );
};

export default index;
