using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using BizTalkComponents.Utils;
using Microsoft.BizTalk.Component.Interop;
using Microsoft.BizTalk.Message.Interop;
using IComponent = Microsoft.BizTalk.Component.Interop.IComponent;

namespace <%= namespace %>.<%= name %>
{
    [ComponentCategory(CategoryTypes.CATID_PipelineComponent)]
    [System.Runtime.InteropServices.Guid("<%= componentUUID %>")]
    [ComponentCategory(CategoryTypes.<%= pipelinestage %>)]
    public partial class <%= name %> : IComponent, IBaseComponent,
                                        IPersistPropertyBag, IComponentUI
    {
        [DisplayName("Property Path")]
        [Description("Property description")]
        [RequiredRuntime]
        public string Property { get; set; }

        public IBaseMessage Execute(IPipelineContext pContext, IBaseMessage pInMsg)
        {
            string errorMessage;

            if (!Validate(out errorMessage))
            {
                throw new ArgumentException(errorMessage);
            }

            //Implementation goes here
            return pInMsg;
        }
    }
}
