from ..utils.any_type import any_type

class AnyTypeExample:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input": (
                    any_type, 
                    {
                        "forceInput": True,
                        "tooltip": "This is a tooltip!"
                    }
                )
            }
        }

    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ("*",)
    FUNCTION = "main"
    CATEGORY = "Cid Node Examples"

    def main(self, input):
        return (input,)
