using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using BizTalkComponents.Utils;
using Microsoft.BizTalk.Component.Interop;
using Microsoft.BizTalk.Message.Interop;
using System.Collections;

namespace <%= namespace %>.<%= name %>
{
    [ComponentCategory(CategoryTypes.CATID_PipelineComponent)]
    [System.Runtime.InteropServices.Guid("<%= componentUUID %>")]
    [ComponentCategory(CategoryTypes.CATID_DisassemblingParser)]
    public partial class <%= name %> : IDisassemblerComponent, IBaseComponent,
                                        IPersistPropertyBag, IComponentUI
    {

         private readonly Queue _outputQueue = new Queue();

        //Sample property
        private const string PropertyName = "PropertyName";

        [DisplayName("Property Path")]
        [Description("Property description")]
        [RequiredRuntime]
        public string Property { get; set; }

        public void Disassemble(IPipelineContext pContext, IBaseMessage pInMsg)
        {
            string errorMessage;

            if (!Validate(out errorMessage))
            {
                throw new ArgumentException(errorMessage);
            }

            //Implementation goes here
            _outputQueue.Enqueue(pInMsg);
        }

        public IBaseMessage GetNext(IPipelineContext pContext)
        {
            if (_outputQueue.Count > 0)
            {
                return (IBaseMessage)_outputQueue.Dequeue();
            }

            return null;
        }
    }
}
