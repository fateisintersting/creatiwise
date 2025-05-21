import  { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Search 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Define the article type
type Article = {
  id: string;
  title: string;
  keyword: string;
  words: number;
  createdOn: string;
};

// Sample data based on the image
const articlesData: Article[] = [
  {
    id: "1",
    title: "How to Improve Your Skills in League of Legends",
    keyword: "league of legends (22400/mo)",
    words: 4578,
    createdOn: "20 hours ago",
  },
  {
    id: "2",
    title: "How to Master your Mining in League of Legends",
    keyword: "league of legends (22400/mo)",
    words: 3480,
    createdOn: "15 hours ago",
  },
  {
    id: "3",
    title: "7 Tips for Better Teamplay in League of Legends",
    keyword: "league of legends (22400/mo)",
    words: 2625,
    createdOn: "4 days ago",
  },
  {
    id: "4",
    title: "The Virtual Executive Assistant Services Guide",
    keyword: "virtual executive assistant (520/m)",
    words: 3478,
    createdOn: "1 Feb, 24",
  },
  {
    id: "5",
    title: "Unlimited Graphic Design Services Database",
    keyword: "unlimited graphic design services (150/m)",
    words: 1755,
    createdOn: "27 Jan, 24",
  },
  {
    id: "6",
    title: "Top Amazon Payment Methods for Quick Access to Funds",
    keyword: "amazon payment methods (350/m)",
    words: 2647,
    createdOn: "25 Jan, 24",
  },
  {
    id: "7",
    title: "Backlinks for What are backlinks and why they're important (Plus examples)",
    keyword: "backlinks (300/m)",
    words: 2291,
    createdOn: "22 Jan, 24",
  },
  {
    id: "8",
    title: "7 Landing B2C Tools In 2024 [Trusted & Compared]",
    keyword: "ai seo software (80/m)",
    words: 1643,
    createdOn: "19 Jan, 24",
  },
  {
    id: "9",
    title: "Unlimited Graphic Design Services You Can Rely On",
    keyword: "unlimited graphic design services (150/m)",
    words: 1874,
    createdOn: "15 Jan, 24",
  },
];

export function ArticlesTable() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredArticles = articlesData.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(articlesData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h2 className="text-2xl font-semibold">Articles</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              All Articles
            </Button>
            <Button variant="outline" size="sm">
              Published Articles
            </Button>
            <Button size="sm">
              Archived Articles
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-sm text-muted-foreground">
              {selectedItems.length > 0 
                ? `${selectedItems.length} selected` 
                : `1-${filteredArticles.length} of ${articlesData.length}`}
            </span>
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedItems.length === articlesData.length} 
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </TableHead>
                <TableHead>Article Title</TableHead>
                <TableHead>Keyword [Traffic]</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Publish</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(article.id)}
                      onCheckedChange={(checked) => handleSelectItem(article.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.keyword}</TableCell>
                  <TableCell>{article.words}</TableCell>
                  <TableCell>{article.createdOn}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-green-500 hover:text-green-600 hover:bg-green-50">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total & Active: {filteredArticles.length} | Show: 
            <select className="ml-1 text-sm border-none bg-transparent">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select> 
            entries per page
          </div>
        </div>
      </div>
    </div>
  );
}