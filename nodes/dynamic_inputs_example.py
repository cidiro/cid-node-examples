class DynamicInputsExample:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string_1": (
                    "STRING", 
                    {
                        "forceInput": True,
                        "tooltip": "This is a tooltip!"
                    }
                )
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "main"
    CATEGORY = "Cid Node Examples"

    def main(self, **kwargs):
        return ()
