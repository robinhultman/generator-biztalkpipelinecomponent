using System;
using System.Collections;
using System.Linq;
using BizTalkComponents.Utils;
using Microsoft.BizTalk.Component.Interop;

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

        public void Load(IPropertyBag propertyBag, int errorLog)
        {
             var props = this.GetType().GetProperties(System.Reflection.BindingFlags.Public 
             | System.Reflection.BindingFlags.Instance);

             foreach (var prop in props)
             {
                 if (prop.CanRead & prop.CanWrite)
                 {
                     prop.SetValue(this, PropertyBagHelper.ReadPropertyBag(propertyBag, prop.Name, 
                        prop.GetValue(this)));
                 }
             }
        }

        public void Save(IPropertyBag propertyBag, bool clearDirty, bool saveAllProperties)
        {
            var props = this.GetType().GetProperties(System.Reflection.BindingFlags.Public 
                | System.Reflection.BindingFlags.Instance);

             foreach (var prop in props)
             {
                 if (prop.CanRead & prop.CanWrite)
                 {
                     PropertyBagHelper.WritePropertyBag(propertyBag, prop.Name, prop.GetValue(this));
                 }
             }
        }
    }
}
