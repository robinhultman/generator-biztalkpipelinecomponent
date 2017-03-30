using System;
using System.Collections;
using System.Linq;
using BizTalkComponents.Utils;

namespace <%= namespace %>.<%= name %>
{
    public partial class <%= name %>
    {
        public string Name { get { return "<%= name %>"; } }
        public string Version { get { return "1.0"; } }
        public string Description { get { return "<%= description %>"; } }

        public void GetClassID(out Guid classID)
        {
            classID = new Guid("<%= compomentClassUUID %>");
        }

        public void InitNew()
        {

        }

        public IEnumerator Validate(object projectSystem)
        {
            return ValidationHelper.Validate(this, false).ToArray().GetEnumerator();
        }

        public bool Validate(out string errorMessage)
        {
            var errors = ValidationHelper.Validate(this, true).ToArray();

            if (errors.Any())
            {
                errorMessage = string.Join(",", errors);

                return false;
            }

            errorMessage = string.Empty;

            return true;
        }

        public IntPtr Icon { get { return IntPtr.Zero; } }
    }
}
